package com.example.back.repository;

import com.example.back.dto.res.ApiRes;
import com.example.back.entity.Status;
import com.example.back.entity.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    @Query("select t from Task t where t.name like %:name% and t.priority like %:priority% and ( :idStatus is null or t.status.id = :idStatus )")
    List<Task> getAllTask(String name, String priority, Long idStatus, Pageable pageable);
}
