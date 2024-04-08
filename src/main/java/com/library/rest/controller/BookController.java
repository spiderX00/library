package com.library.rest.controller;

import com.library.rest.model.Book;
import com.library.rest.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@ResponseStatus(HttpStatus.OK)
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public Page<Book> findAll(@RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
                              @RequestParam(defaultValue = "10") @Min(1) Integer pageSize) throws Exception {
        return this.bookService.findAllBooks(pageNumber, pageSize);
    }

    /**
     * Retrieves a list of books by title.
     *
     * @param title      The title to search for.
     * @param pageNumber The page number (optional, default = 0).
     * @param pageSize   The page size (optional, default = 10).
     * @return A list of matching books.
     */
    @GetMapping("/filter-by/{title}")
    public Page<Book> findBooksByTitle(@PathVariable @NotBlank String title,
                                       @RequestParam(defaultValue = "0") @Min(0) Integer pageNumber,
                                       @RequestParam(defaultValue = "10") @Min(1) Integer pageSize) {
        return bookService.findBookByTitle(title, pageNumber, pageSize);
    }

    /**
     * Retrieves a book by its ID.
     *
     * @param bookId The ID of the book.
     * @return An optional containing the book (if found).
     */
    @GetMapping("/get-book/{bookId}")
    public Optional<Book> findBookById(@PathVariable Long bookId) {
        return bookService.findBookById(bookId);
    }
}
