package signin_jwt.signin_jwt.models;

// import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private String token;
    private String name;
    private String email;
    private String expirationTime;
    private String message;
    private String role;
    private int statusCode;
    private String phone;
}
