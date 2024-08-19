package com.example.back.controller;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.service.interf.SubTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("api/v1/subtask/")
public class SubTaskController {
    public final SubTaskService subTaskService;

    @GetMapping("/getAll")
    public ResponseEntity<ApiRes> getAllSubTask(@RequestParam(defaultValue = "") String name,
                                                @RequestParam(defaultValue = "") String priority,
                                                @RequestParam(required = false) Long idStatus,
                                                @RequestParam(name="page",defaultValue = "1") int page,
                                                @RequestParam(name = "limit",defaultValue = "3")int limit
                                                ) {
        return ResponseEntity.ok(subTaskService.getAllSubTask(name, priority, idStatus,page,limit));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiRes> createSubTask(@RequestBody SubTaskReq subTaskReq) {
        return ResponseEntity.ok(subTaskService.createSubTask(subTaskReq));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiRes> updateSubTask(@PathVariable Long id, @RequestBody SubTaskReq subTaskReq) {
        return ResponseEntity.ok(subTaskService.updateSubTask(id, subTaskReq));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiRes> deleteSubTask(@PathVariable Long id) {
        return ResponseEntity.ok(subTaskService.deleteSubTask(id));
    }
}
