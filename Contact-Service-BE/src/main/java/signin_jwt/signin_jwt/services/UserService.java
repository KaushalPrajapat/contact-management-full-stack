package signin_jwt.signin_jwt.services;

import signin_jwt.signin_jwt.models.Request;
import signin_jwt.signin_jwt.models.Response;
import signin_jwt.signin_jwt.models.User;

public interface UserService {

    Response saveUser(User user);

    Response signIn(Request request);

    Response userValidator(String code);

    Response getNewCode(String email);

    Response changePassword(String newPassword, String email);

    Response updateUserEmail(User user);

    Response deleteUser(int uid);

    Response updateUser(User user);
    
    User getUser(int user_id);

}