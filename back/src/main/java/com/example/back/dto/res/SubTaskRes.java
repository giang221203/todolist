package com.example.back.dto.res;

import com.example.back.entity.Status;
import com.example.back.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubTaskRes {
    private Long id;
    private String name;
    private String description;
    private String priority;
    private Float progress;
    private StatusRes status;
    private TaskRes task;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
