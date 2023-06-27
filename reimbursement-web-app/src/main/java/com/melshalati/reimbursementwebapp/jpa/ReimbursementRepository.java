package com.melshalati.reimbursementwebapp.jpa;

import com.melshalati.reimbursementwebapp.models.reimbursement.Reimbursement;
import com.melshalati.reimbursementwebapp.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {

    @Query("""
        SELECT r FROM Reimbursement r INNER JOIN Employee e on r.employee.id = e.id
        WHERE e.id = :id
    """)
    List<Reimbursement> findAllReimbursementsByUser(Integer id);
}