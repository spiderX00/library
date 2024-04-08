package com.library.rest.controller;

import com.library.rest.model.Book;
import com.library.rest.model.Borrow;
import com.library.rest.model.User;
import com.library.rest.service.BorrowService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@ResponseStatus(HttpStatus.OK)
@RequestMapping("/api/borrow")
public class BorrowController {

    private final BorrowService borrowService;

    @Autowired
    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/borrow-book/{userId}")
    public Borrow borrowBook(@PathVariable Long userId, @RequestBody @NotNull Book book) {
        try {
            return borrowService.borrowBook(userId, book);
        } catch (EntityNotFoundException e) {
            // Handle the exception appropriately (e.g., return a custom error response)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User or book not found", e);
        }
    }

    @PostMapping("/return-book/{userId}")
    public void returnBook(@PathVariable Long userId, @RequestBody @NotNull Book book) {
        try {
            borrowService.returnBook(userId, book);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User or book not found", e);
        }
    }

    @GetMapping("/borrowed-books/{userId}")
    public Page<Book> getBorrowedBooks(@PathVariable Long userId,
                                       @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
                                       @RequestParam(defaultValue = "10") @Min(1) Integer pageSize) {
        try {
            return borrowService.getBorrowedBooks(userId, pageNumber, pageSize);
        } catch (EntityNotFoundException e) {
            // Handle the exception appropriately (e.g., return a custom error response)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found", e);
        }
    }

}
