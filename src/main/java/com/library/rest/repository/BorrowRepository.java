package com.library.rest.repository;

import com.library.rest.model.Book;
import com.library.rest.model.Borrow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    @Query("SELECT borrow.book FROM Borrow borrow WHERE borrow.user.id  = :userId")
    Page<Book> findBooksByUserId(Long userId, Pageable pageable);

    @Query("SELECT borrow FROM Borrow borrow WHERE borrow.user.id = :userId AND borrow.book.id = :bookId")
    Borrow findBorrowedBookById(Long userId, Long bookId);
}
