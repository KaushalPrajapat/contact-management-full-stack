package signin_jwt.signin_jwt.services.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import signin_jwt.signin_jwt.jwtConfigs.JwtHelper;
import signin_jwt.signin_jwt.models.Request;
import signin_jwt.signin_jwt.models.Response;
import signin_jwt.signin_jwt.models.User;
import signin_jwt.signin_jwt.repositories.UserRepo;
import signin_jwt.signin_jwt.services.UserService;

@Service
@PropertySource("classpath:props.properties")
public class UserServiceImpl implements UserService {

    // private Logger logger = LoggerFactory(getClass());
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private EmailServiceImpl emailService;

    @Value("${email.subject}")
    private String subject;

    @Value("${email.one}")
    private String one;

    @Value("${email.two}")
    private String two;

    @Value("${email.three}")
    private String three;

    @Override
    public Response saveUser(User user) {
        Optional<User> isUserExists = userRepo.findByEmail(user.getEmail());
        if (user.getRole() == null)
            user.setRole("USER");
        if (!isUserExists.isPresent()) {
            sendValidationEmail(user);
            // Saving to DBT and returning DTO
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepo.save(user);
            System.out.println("User Saved Here : " + savedUser);
            return Response.builder().email(savedUser.getEmail())
                    .name(savedUser.getFirstName() + " " + savedUser.getLastName())
                    .phone(savedUser.getPhone()).message("Account Created SuccessFully!!, Please validate Now")
                    .statusCode(200).build();
        } else
            return Response.builder()
                    // .id(isUserExists.getUserId())
                    .email(isUserExists.get().getEmail())
                    // .firstName(isUserExists.getFirstName()).lastName(isUserExists.getLastName())
                    // .phone(isUserExists.getPhone())
                    .message("Account Exists Already!!, Try To LogIn")
                    .statusCode(500).build();
    }

    @Override
    public Response signIn(Request request) {
        System.out.println(request);
        Response response = new Response();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),
                            request.getPassword()));
            User user = userRepo.findByEmail(request.getEmail()).get();
            var jwt = jwtHelper.generateToken(user);
            response.setToken(jwt);
            response.setName(user.getFirstName() + " " + user.getLastName());
            response.setEmail(user.getEmail());
            response.setExpirationTime("24Hrs");
            response.setMessage("Logged In...");
            response.setStatusCode(200);
            response.setPhone(user.getPhone());
            response.setRole(user.getRole());

        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }

    @Override
    public Response userValidator(String code) {
        Optional<User> u = userRepo.findByValidationCode(code);
        System.out.println(code);
        System.out.println(u);
        if (u.get() != null && code.equals(u.get().getValidationCode())) {
            u.get().setValidationCode("-1");
            userRepo.save(u.get());
            return Response.builder()
                    .message("User validated SuccessFully !!! enjoy !!! 😊")
                    .statusCode(200).build();
        }
        return Response.builder().message("Invalid Code 😔😔")
                .statusCode(500).build();
    }

    @Override
    public Response getNewCode(String email) {
        Optional<User> u = userRepo.findByEmail(email);
        if (u.isPresent()) {
            if (u.get().getValidationCode().equals("-1")) {
                return Response.builder()
                        .message("Account already Validated Try to change Password")
                        .statusCode(400)
                        .build();
            }
            sendValidationEmail(u.get());
            userRepo.save(u.get());
            return Response.builder()
                    .message("New Code Sent Success-Fully!! Please validate")
                    .statusCode(200)
                    .build();
        }
        return Response.builder()
                .message("User Does not exists!! Plese SignUp!!!")
                .statusCode(400)
                .build();
    }

    @Override
    public Response changePassword(String newPassword, String email) {
        Optional<User> user = userRepo.findByEmail(email);
        if (!user.isPresent()) {
            return Response.builder().email(email)
                    .message("No User Exists with this mail Id")
                    .statusCode(500)
                    .build();
        }

        if (user.get() != null) {
            if (passwordEncoder.matches(newPassword, user.get().getPassword())) {
                return Response.builder().email(user.get().getEmail())
                        .name(user.get().getFirstName() + " " + user.get().getLastName())
                        .phone(user.get().getPhone()).message("Password Same as before")
                        .statusCode(500)
                        .build();
            }
            sendValidationEmail(user.get());
            user.get().setPassword(passwordEncoder.encode(newPassword));
            // Saving to DBT and returning DTO
            User savedUser = userRepo.save(user.get());
            return Response.builder().email(savedUser.getEmail())
                    .name(savedUser.getFirstName() + " " + savedUser.getLastName())
                    .phone(savedUser.getPhone()).statusCode(200)
                    .message("Password Changed SuccessFully!!, Please Validated Now")
                    .build();
        }
        return null;
    }

    @Override
    public Response updateUserEmail(User user) {
        User isUserExists = userRepo.findById(user.getUserId()).get();

        if (isUserExists != null) {
            sendValidationEmail(user);
            if (user.getFirstName() != null) {
                isUserExists.setFirstName(user.getFirstName());
            }
            if (user.getLastName() != null) {
                isUserExists.setLastName(user.getLastName());
            }
            if (user.getPhone() != null) {
                isUserExists.setPhone(user.getPhone());
            }
            if (user.getEmail() != null) {
                isUserExists.setEmail(user.getEmail());
            }
            isUserExists.setValidationCode(user.getValidationCode());
            // Saving to DBT and returning DTO
            User savedUser = userRepo.save(isUserExists);
            return Response.builder().email(savedUser.getEmail())
                    .name(savedUser.getFirstName() + " " + savedUser.getLastName())
                    .phone(savedUser.getPhone()).message("Email Updated SuccessFully!!, Please Validated Now")
                    .build();
        }
        return null;
    }

    @Override
    public Response deleteUser(int uid) {
        User u = userRepo.findById(uid).get();
        userRepo.deleteById(uid);
        return Response.builder().email(u.getEmail())
                .name(u.getFirstName() + " " + u.getLastName())
                .phone(u.getPhone())
                .statusCode(200).build();
    }

    @Override
    public User getUser(int user_id) {
        return userRepo.findById(user_id).orElse(null);
    }

    @Override
    public Response updateUser(User user) {
        User u = userRepo.findById(user.getUserId()).get();
        System.out.println(u);
        if (user.getFirstName() != null) {
            u.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            u.setLastName(user.getLastName());
        }
        if (user.getPhone() != null) {
            u.setPhone(user.getPhone());
        }
        u = userRepo.save(u);

        return Response.builder().email(u.getEmail())
                .name(u.getFirstName() + u.getLastName())
                .phone(u.getPhone())
                .statusCode(200).build();
    }

    private void sendValidationEmail(User user) {
        // Email Validation Code is here
        String validationCode = emailService.validationCodeGenerater();
        user.setValidationCode(validationCode);
        // System.out.println(user.getValidationCode());
        String message = one + user.getFirstName() + " " + user.getLastName() + two
                + validationCode + three;
        emailService.sendEmailWithHtml(user.getEmail(), subject, message);

    }

}