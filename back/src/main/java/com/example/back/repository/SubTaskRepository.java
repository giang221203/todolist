package com.example.back.repository;

import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SubTaskRepository extends JpaRepository<SubTask,Long> {
    @Query("select st from SubTask st where st.name like %:name% and st.priority like %:priority% and ( :idStatus is null or st.status.id = :idStatus ) and (:createTime is null or FUNCTION ('DATE',st.createdAt) >= :createTime) and (:updateTime is null or FUNCTION ('DATE',st.updatedAt) >= :updateTime)")
    List<SubTask> getAllSubTask(String name, String priority, Long idStatus, Pageable pageable, @Param("createTime") LocalDate createTime,@Param("updateTime") LocalDate updateTime);

    @Query("select st from SubTask st where st.task.id = :id and st.name like %:name% and st.priority like %:priority% and ( :idStatus is null or st.status.id = :idStatus ) and (:createTime is null or FUNCTION ('DATE',st.createdAt) >= :createTime) and (:updateTime is null or FUNCTION ('DATE',st.updatedAt) >= :updateTime)")
    List<SubTask> getAllSubTaskById(Long id,String name, String priority, Long idStatus, Pageable pageable,@Param("createTime") LocalDate createTime,@Param("updateTime") LocalDate updateTime);
}
