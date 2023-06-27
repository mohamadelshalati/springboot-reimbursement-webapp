package com.melshalati.reimbursementwebapp.models.reimbursement;

import com.melshalati.reimbursementwebapp.models.employee.Employee;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reimbursement {

    @Id
    @GeneratedValue
    private int ticketId;
    @Column(nullable = false)
    @Min(1)
    private BigDecimal amount;
    @Column(nullable = false)
    @Size(min = 10, message = "Description should have at least 2 characters")
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;
    @Column(nullable = false)
    private Timestamp submitTime;
    private Timestamp resolveTime;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReimbursementType reimbursementType;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReimbursementStatus reimbursementStatus;

}
