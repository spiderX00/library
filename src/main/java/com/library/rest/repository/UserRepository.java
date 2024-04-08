package com.library.rest.repository;

import com.library.rest.model.Book;
import com.library.rest.model.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT user FROM User user WHERE user.email = :email")
    User findUserByEmail(String email);
}