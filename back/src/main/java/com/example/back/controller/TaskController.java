package com.example.back.controller;

import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.ApiResPage;
import com.example.back.service.interf.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("api/v1/task/")
public class TaskController {
    public final TaskService taskService;

    @GetMapping("/getAll")
    public ResponseEntity<ApiResPage> getAllTask(@RequestParam(defaultValue = "")String name,
                                                 @RequestParam(defaultValue = "") String priority,
                                                 @RequestParam(required = false)  Long idStatus,
                                                 @RequestParam(name="page",defaultValue = "1") int page,
                                                 @RequestParam(name = "limit",required = false,defaultValue = "10")Integer limit,
                                                 @RequestParam(name = "createTime",required = false) LocalDate createTime,
                                                 @RequestParam(name = "updateTime",required = false) LocalDate updateTime
                                             ) {
        return ResponseEntity.ok(taskService.getAllTask(name, priority, idStatus,page,limit,createTime,updateTime));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiRes> createTask(@RequestBody TaskReq taskReq) {
        return ResponseEntity.ok(taskService.createTask(taskReq));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiRes> updateTask(@PathVariable Long id, @RequestBody TaskReq taskReq) {
        return ResponseEntity.ok(taskService.updateTask(id, taskReq));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiRes> deleteTask(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.deleteTask(id));
    }
}
