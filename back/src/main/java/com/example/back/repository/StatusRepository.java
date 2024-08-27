package com.example.back.repository;

import com.example.back.entity.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StatusRepository extends JpaRepository<Status,Long> {
    @Query("select s from Status s where s.name like %:name%")
    List<Status> getAllStatus(String name, Pageable pageable);
    @Query("select s from Status s where s.name like %:name%")
    List<Status> getAllStatus(String name);

}
