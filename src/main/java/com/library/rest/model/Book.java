package com.library.rest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "books")
public class Book extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 50, nullable = false)
    private String author;

    @Column(length = 20, unique = true)
    private String ISBNCode;

    @Column
    private Date dateAdded;

    @Column
    private Date dateRemoved;

    @Column(columnDefinition = "TEXT")
    private String plot;

    @Column
    private Integer numberOfReading;

    @Column
    private Boolean isRented = false;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public Book(String title, String author, String ISBNCode, Date dateAdded, Date dateRemoved, String plot, Integer numberOfReading, Boolean isRented, User user) {
        this.title = title;
        this.author = author;
        this.ISBNCode = ISBNCode;
        this.dateAdded = dateAdded;
        this.dateRemoved = dateRemoved;
        this.plot = plot;
        this.numberOfReading = numberOfReading;
        this.isRented = isRented;
        this.user = user;
    }

    public Book() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getISBNCode() {
        return ISBNCode;
    }

    public void setISBNCode(String ISBNCode) {
        this.ISBNCode = ISBNCode;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Date getDateRemoved() {
        return dateRemoved;
    }

    public void setDateRemoved(Date dateRemoved) {
        this.dateRemoved = dateRemoved;
    }

    public String getPlot() {
        return plot;
    }

    public void setPlot(String plot) {
        this.plot = plot;
    }

    public Integer getNumberOfReading() {
        return numberOfReading;
    }

    public void setNumberOfReading(Integer numberOfReading) {
        this.numberOfReading = numberOfReading;
    }

    public Boolean getRented() {
        return isRented;
    }

    public void setRented(Boolean rented) {
        isRented = rented;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
