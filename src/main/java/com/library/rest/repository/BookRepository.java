package com.library.rest.repository;

import com.library.rest.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

    @Query("SELECT book FROM Book book WHERE book.title = :title")
    Page<Book> findBooksByTitle(String title, Pageable pageable);
}
