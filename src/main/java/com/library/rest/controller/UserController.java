package com.library.rest.controller;

import com.library.rest.model.User;
import com.library.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@RestController
@ResponseStatus(HttpStatus.ACCEPTED)
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * User login endpoint.
     *
     * @param loginUser The user object containing login credentials.
     * @return The authenticated user.
     * @throws Exception If an error occurs during login.
     */
    @PostMapping("/login")
    public User login(@RequestBody @Valid @NotNull User loginUser) throws Exception {
        return userService.login(loginUser);
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param userId The ID of the user.
     * @return An optional containing the user (if found).
     * @throws Exception If an error occurs during retrieval.
     */
    @GetMapping("/{userId}")
    public Optional<User> getUserById(@PathVariable Long userId) throws Exception {
        return userService.findById(userId);
    }
}
