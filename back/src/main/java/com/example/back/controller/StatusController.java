package com.example.back.controller;

import com.example.back.dto.req.StatusReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.service.interf.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("api/v1/status/")
public class StatusController {
    public final StatusService statusService;
    @GetMapping("/getAll")
    public ResponseEntity<ApiRes> getAllStatus(@RequestParam(name = "name",defaultValue = "") String name){
        return ResponseEntity.ok(statusService.getAllStatus(name));
    }
    @PostMapping("/create")
    public ResponseEntity<ApiRes> createStatus(@RequestBody StatusReq statusReq){
        return ResponseEntity.ok(statusService.createStatus(statusReq));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiRes> updateStatus(@PathVariable Long id,@RequestBody StatusReq statusReq){
        return ResponseEntity.ok(statusService.updateStatus(id,statusReq));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiRes> deleteStatus(@PathVariable Long id){
        return ResponseEntity.ok(statusService.deleteStatus(id));
    }
}
