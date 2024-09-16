package com.example.back.controller;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.ApiResPage;
import com.example.back.service.interf.SubTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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
                                                @RequestParam(name = "page", defaultValue = "1") int page,
                                                @RequestParam(name = "limit", defaultValue = "10") int limit,
                                                @RequestParam(name = "createTime",required = false) LocalDate createTime,
                                                @RequestParam(name = "updateTime",required = false) LocalDate updateTime

    ) {
        return ResponseEntity.ok(subTaskService.getAllSubTask(name, priority, idStatus, page, limit,createTime,updateTime));
    }

    @GetMapping("/getbyidtask/{id}")
    public ResponseEntity<ApiResPage> getAllSubTaskById(@PathVariable Long id,
                                                        @RequestParam(defaultValue = "") String name,
                                                        @RequestParam(defaultValue = "") String priority,
                                                        @RequestParam(required = false) Long idStatus,
                                                        @RequestParam(name = "page", defaultValue = "1") int page,
                                                        @RequestParam(name = "limit", defaultValue = "3") int limit,
                                                        @RequestParam(name = "createTime",required = false) LocalDate createTime,
                                                        @RequestParam(name = "updateTime",required = false) LocalDate updateTime,
                                                        @RequestParam(defaultValue = "updatedAt") String nameSort,
                                                        @RequestParam(defaultValue = "DESC") String direction
    ) {
        return ResponseEntity.ok(subTaskService.getAllSubTaskById(id, name, priority, idStatus, page, limit,createTime,updateTime,nameSort,direction));
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<ApiRes> getSubTaskById(@PathVariable Long id){
        return ResponseEntity.ok(subTaskService.getSubTaskById(id));
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
