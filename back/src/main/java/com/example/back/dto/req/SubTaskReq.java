package com.example.back.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubTaskReq {
    private String name;
    private String description;
    private String priority;
    private Long idStatus;
    private Long idTask;
}
