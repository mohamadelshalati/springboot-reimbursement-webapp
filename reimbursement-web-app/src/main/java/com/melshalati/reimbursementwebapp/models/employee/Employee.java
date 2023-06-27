package com.melshalati.reimbursementwebapp.models.employee;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.melshalati.reimbursementwebapp.models.reimbursement.Reimbursement;
import com.melshalati.reimbursementwebapp.token.Token;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(nullable = false)
    @Size(min = 1, message = "firstname should have at least 1 characters")
    private String firstname;
    @Column(nullable = false)
    @Size(min = 1, message = "lastname should have at least 1 characters")
    private String lastname;
    @Column(nullable = false, unique = true)
    @Email
    @Size(min = 7, message = "email should have at least 7 characters")
    private String email;
    @Column(nullable = false)
    @Size(min = 8, message = "password should have at least 8 characters")
    private String password;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)

    @JsonIgnore
    private List<Reimbursement> reimbursementList;
    @OneToMany(mappedBy ="employee")
    @JsonIgnore
    private List<Token> tokens;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

}
