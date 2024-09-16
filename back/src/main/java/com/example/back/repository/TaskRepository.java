package com.example.back.repository;


import com.example.back.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    @Query("select t from Task t where t.name like %:name% and t.priority like %:priority%  and ( :idStatus is null or t.status.id = :idStatus ) and(:dateTime is null or FUNCTION('DATE', t.createdAt) >= :dateTime) and(:updateTime is null or FUNCTION('DATE', t.updatedAt) >= :updateTime)")
    Page<Task> getAllTask(String name, String priority, Long idStatus, Pageable pageable, LocalDate dateTime, LocalDate updateTime);
    @Query("select t from Task t where t.name like %:name% and t.priority like %:priority% and ( :idStatus is null or t.status.id = :idStatus ) and(:createTime is null or FUNCTION('DATE', t.createdAt) >= :createTime) and(:updateTime is null or FUNCTION('DATE', t.updatedAt) >= :updateTime)")
    List<Task> getAllTask(String name, String priority, Long idStatus,@Param("createTime") LocalDate createTime,LocalDate updateTime);


    List<Task> findByNameAndIdNot(String name,Long id);
}
