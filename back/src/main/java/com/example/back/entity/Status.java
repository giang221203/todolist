package com.example.back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Boolean isDefault;
    @OneToMany(mappedBy = "status")
    private List<Task> task;
    @OneToMany(mappedBy = "status", cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private List<SubTask> subTasks;
}
