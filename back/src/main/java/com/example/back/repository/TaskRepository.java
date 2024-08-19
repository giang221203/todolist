package com.example.back.repository;

import com.example.back.dto.res.ApiRes;
import com.example.back.entity.Status;
import com.example.back.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

}
