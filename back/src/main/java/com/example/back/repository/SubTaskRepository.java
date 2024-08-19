package com.example.back.repository;

import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubTaskRepository extends JpaRepository<SubTask,Long> {
    @Query("select st from SubTask st where st.name like %:name% and st.priority like %:priority% and ( :idStatus is null or st.status.id = :idStatus )")
    List<SubTask> getAllSubTask(String name, String priority, Long idStatus, Pageable pageable);
}
