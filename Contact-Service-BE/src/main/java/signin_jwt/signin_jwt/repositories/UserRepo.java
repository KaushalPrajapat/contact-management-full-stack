package signin_jwt.signin_jwt.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import signin_jwt.signin_jwt.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByValidationCode(String code);
}
