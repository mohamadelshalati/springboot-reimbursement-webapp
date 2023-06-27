package com.melshalati.reimbursementwebapp.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query("""
        SELECT t FROM Token t INNER JOIN Employee e on t.employee.id = e.id
        WHERE e.id = :id AND (t.expired = false OR t.revoked = false)        
    """)
    List<Token> findAllValidTokensByUser(Integer id);

    Optional<Token> findByToken(String token);

}
