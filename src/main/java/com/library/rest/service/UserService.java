package com.library.rest.service;

import com.library.rest.model.Book;
import com.library.rest.model.User;
import com.library.rest.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final BookService bookService;

    @Autowired
    public UserService(UserRepository userRepository, BookService bookService) {
        this.userRepository = userRepository;
        this.bookService = bookService;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(String.valueOf(id));
    }

    public User login(User loginUser) {
        User existingUser = userRepository.findUserByEmail(loginUser.getEmail());
        return existingUser != null ? existingUser : userRepository.saveAndFlush(loginUser);
    }
}
