package signin_jwt.signin_jwt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.websocket.server.PathParam;
import signin_jwt.signin_jwt.models.Request;
import signin_jwt.signin_jwt.models.Response;
import signin_jwt.signin_jwt.models.User;
import signin_jwt.signin_jwt.services.UserService;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userServices;

    // SignUp - It will send one Email with validation code
    // First varify that then only you can use further
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        return ResponseEntity.ok(userServices.saveUser(user));
    }

    // SignIn with Jwt validation
    @PostMapping("/sign-in")
    public ResponseEntity<Response> login(@RequestBody Request request) {
        return ResponseEntity.ok(userServices.signIn(request));
    }

    @PutMapping("/update-user")
    // I got a Q's here if SomeOne sends other userData here with his token THEN;
    // Answer is Only his userData will be updated As It using logged in userId to
    // update;
    // It doesn't Matter if someone gave USER_ID in input or not
    // *************** Only FirstName, LastName and Phone number can be changed
    public ResponseEntity<?> updateUserBasic(@RequestBody User user) {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setUserId(pUser.getUserId());
        return ResponseEntity.ok(userServices.updateUser(user));
    }

    // Here Who can delete user
    // In this controller or method only user with his token only can delete user
    // He need not to give user_id or anything He just need to give his token;
    @DeleteMapping("/delete-user")
    public ResponseEntity<?> deleteUser() {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(userServices.deleteUser(pUser.getUserId()));
    }

    // Email Validation
    // One code will be recieved on your email
    // After Validation that code only then you can use application further More
    @PostMapping("/validation-user")
    public ResponseEntity<?> codeValidation(@PathParam(value = "code") String code) {
        return ResponseEntity.ok(userServices.userValidator(code));
    }

    @PutMapping("/update-user-email")
    // I got a Q's here if SomeOne sends other userData here with his token THEN;
    // Answer is Only his userData will be updated As It using logged in userId to
    // update;
    // It doesn't Matter if someone gave USER_ID in input or not
    // *************** Only FirstName, LastName and Phone number and Email Also But
    // not Password can be changed
    public ResponseEntity<?> updateUserEmailAndBasic(@RequestBody User user) {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setUserId(pUser.getUserId());
        return ResponseEntity.ok(userServices.updateUserEmail(user));
    }

    // Only Password can be changed -
    // After change need to validate the OTP code
    @PutMapping("/forgot-password")
    public ResponseEntity<?> changePassword(@RequestBody User user) {
        return ResponseEntity.ok(userServices.changePassword(user.getPassword(), user.getEmail()));
    }

    @PostMapping("/get-new-code/{email}")
    public ResponseEntity<?> getNewCode(@PathVariable String email) {
        System.out.println(email + "email");
        Response res = userServices.getNewCode(email);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/secured")
    public String secured(){
        return "This is Secured Popint";
    }
}
