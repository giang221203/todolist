package com.example.back.dto.res;

import com.example.back.entity.Status;
import com.example.back.entity.SubTask;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskRes {
    private Long id;
    private String name;
    private String description;
    private String priority;
    private Float progress;
    private Status status;
    private List<SubTask> subtasks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
