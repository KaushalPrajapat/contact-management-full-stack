package signin_jwt.signin_jwt.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class Request {
    private String email;
    private String password;
}
