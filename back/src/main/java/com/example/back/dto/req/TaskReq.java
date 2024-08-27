package com.example.back.dto.req;

import com.example.back.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskReq {
    private String name;
    private String description;
    private String priority;
    private Long idStatus;
}
