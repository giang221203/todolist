package com.example.back.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatusRes {
    private Long id;
    private String name;
    private Boolean isDefault;
    private String description;
}
