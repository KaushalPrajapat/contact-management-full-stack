package signin_jwt.signin_jwt.jwtConfigs;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtHelper {

    private SecretKey KEY;
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

    public JwtHelper() {
        String secreteString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.KEY = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(UserDetails UserDetails) {
        String token = null;
        System.out.println("I'm trying to generet token");
        Map<String, Object> claims = new HashMap<>();
        token = generateTokenHelper(UserDetails.getUsername(), claims);
        return token;
    }

    private String generateTokenHelper(String subject, Map<String, Object> claims) {
        String token = null;
        token = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY).compact();
        return token;
    }

    public  String extractUsername(String token){
        return  extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        Claims clms = getAllClaimsFromToken(token);
        return claimsTFunction.apply(clms);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token).getBody();
    }

    public  boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public  boolean isTokenExpired(String token){
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }


}
