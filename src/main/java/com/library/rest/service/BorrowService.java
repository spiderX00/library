package com.library.rest.service;

import com.library.rest.model.Book;
import com.library.rest.model.Borrow;
import com.library.rest.model.User;
import com.library.rest.repository.BorrowRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class BorrowService {
    private final BorrowRepository borrowRepository;
    private UserService userService;
    private BookService bookService;

    @Autowired
    public BorrowService(BorrowRepository borrowRepository, UserService userService, BookService bookService) {
        this.borrowRepository = borrowRepository;
        this.userService = userService;
        this.bookService = bookService;
    }

    public Page<Book> getBorrowedBooks(Long userId, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return borrowRepository.findBooksByUserId(userId, pageable);
    }

    public Borrow getBorrowedBookById(Long userId, Long bookId) {
        return borrowRepository.findBorrowedBookById(userId, bookId);
    }

    public Borrow borrowBook(Long userId, Book book) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        book.setRented(true);
        book.setNumberOfReading(book.getNumberOfReading() + 1);
        Borrow borrow = new Borrow(user, book);
        book.setUser(user);
        this.bookService.save(book);
        return borrowRepository.save(borrow);
    }

    public void returnBook(Long userId, Book book) {
        book.setRented(false);
        Borrow borrow = getBorrowedBookById(userId, book.getId());
        book.setUser(null);
        this.bookService.save(book);
        this.borrowRepository.deleteById(borrow.getId());
    }

}
