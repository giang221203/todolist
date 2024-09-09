package com.example.back.service.impl;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.SubTaskRes;
import com.example.back.dto.res.TaskRes;
import com.example.back.entity.Status;
import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import com.example.back.mapping.SubTaskMapping;
import com.example.back.mapping.TaskMapping;
import com.example.back.repository.StatusRepository;
import com.example.back.repository.SubTaskRepository;
import com.example.back.repository.TaskRepository;
import com.example.back.service.interf.SubTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SubTaskImpl implements SubTaskService {
    public final SubTaskRepository subTaskRepository;
    public final StatusRepository statusRepository;
    public final TaskRepository taskRepository;

    @Override
    public ApiRes getAllSubTask(String name,String priority,Long idStatus,int page, int limit,LocalDate createTime,LocalDate updateTime) {
        try {
            Pageable pageable = PageRequest.of(page -1, limit);
            List<SubTask> subTaskList = subTaskRepository.getAllSubTask(name, priority, idStatus,pageable,createTime,updateTime);
            List<SubTaskRes> subTaskResList = subTaskList.stream().map(SubTaskMapping::mapEntityToRes).toList();
            return new ApiRes(true, "Lấy dữ liệu thành công", subTaskResList);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes createSubTask(SubTaskReq subTaskReq) {
        try {
            SubTask subTaskCreate = SubTaskMapping.mapReqToEntity(subTaskReq);
            Optional<Status> status = statusRepository.findById(subTaskReq.getIdStatus());
            Optional<Status> statusOpen = statusRepository.findById(1L);
            Optional<Status> statusDone = statusRepository.findById(2L);
            Optional<Task> task = taskRepository.findById(subTaskReq.getIdTask());
            if (status.get().getName().equals("done")) {
                subTaskCreate.setProgress(100F);
            }else {
                subTaskCreate.setProgress(0F);
            }
            subTaskCreate.setCreatedAt(LocalDateTime.now());
            subTaskCreate.setStatus(status.get());
            subTaskCreate.setTask(task.get());
            task.get().setUpdatedAt(LocalDateTime.now());
            subTaskRepository.save(subTaskCreate);
            List<SubTask> soLuongSubTaskDone = task.get().getSubtasks().stream().filter(el -> el.getStatus().getName().equals("done")).toList();
            Float tongSoLuongSubTask = Float.valueOf(task.get().getSubtasks().size());
            Float progress = (soLuongSubTaskDone.size() / tongSoLuongSubTask) * 100;
            if(progress != 100L){
                task.get().setStatus(statusOpen.get());
            }else {
                task.get().setStatus(statusDone.get());
            }
            task.get().setProgress(progress);
            taskRepository.save(task.get());

            return new ApiRes(true, "Thêm dữ liệu thành công", null);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes updateSubTask(Long id, SubTaskReq subTaskReq) {
        try {
            Optional<SubTask> subTaskById = subTaskRepository.findById(id);
            if (subTaskById.isPresent()) {
                SubTask subTaskUpdate = SubTaskMapping.mapReqToEntity(subTaskReq);
                Optional<Status> status = statusRepository.findById(subTaskReq.getIdStatus());
                Optional<Task> taskUpdate = taskRepository.findById(subTaskReq.getIdTask());
                Optional<Status> statusOpen = statusRepository.findById(1L);
                Optional<Status> statusDone = statusRepository.findById(2L);
                subTaskUpdate.setId(id);
                if (status.get().getName().equals("done")) {
                    subTaskUpdate.setProgress(100F);
                }else {
                    subTaskUpdate.setProgress(0F);
                }

                subTaskUpdate.setStatus(status.get());
                subTaskUpdate.setTask(taskUpdate.get());

                subTaskRepository.save(subTaskUpdate);
                if(!taskUpdate.get().getSubtasks().isEmpty()){
                    List<SubTask> soLuongSubTaskDone = taskUpdate.get().getSubtasks().stream().filter(el -> el.getStatus().getName().equals("done")).toList();
                    Float tongSoLuongSubTask = Float.valueOf(taskUpdate.get().getSubtasks().size());
                    Float progress = (soLuongSubTaskDone.size() / tongSoLuongSubTask) * 100;
                    if(progress != 100L){
                        taskUpdate.get().setStatus(statusOpen.get());
                    }else {
                        taskUpdate.get().setStatus(statusDone.get());
                    }
                    taskUpdate.get().setProgress(progress);
                    taskRepository.save(taskUpdate.get());
                }

                taskUpdate.get().setUpdatedAt(LocalDateTime.now());

                return new ApiRes(true, "Cập nhật dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }

        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes deleteSubTask(Long id) {
        try {
            Optional<SubTask> subTaskById = subTaskRepository.findById(id);
            Optional<Status> statusOpen = statusRepository.findById(1L);
            Optional<Status> statusDone = statusRepository.findById(2L);
            if (subTaskById.isPresent()) {
                Optional<Task> task = taskRepository.findById(subTaskById.get().getTask().getId());
                subTaskRepository.deleteById(id);

                if(!task.get().getSubtasks().isEmpty()){
                    List<SubTask> soLuongSubTaskDone = task.get().getSubtasks().stream().filter(el -> el.getStatus().getName().equals("done")).toList();
                    Float tongSoLuongSubTask = Float.valueOf(task.get().getSubtasks().size());
                    Float progress = (soLuongSubTaskDone.size() / tongSoLuongSubTask) * 100;
                    task.get().setProgress(progress);
                    if(progress != 100L){
                        task.get().setStatus(statusOpen.get());
                    }else {
                        task.get().setStatus(statusDone.get());
                    }
                }else {
                    task.get().setProgress(0F);
                }
                task.get().setUpdatedAt(LocalDateTime.now());
                taskRepository.save(task.get());

                return new ApiRes(true, "Xoá dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }

        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes getAllSubTaskById(Long id, String name, String priority, Long idStatus, int page, int limit, LocalDate createTime,LocalDate updateTime) {
        try {
            Pageable pageable = PageRequest.of(page -1, limit);
            List<SubTask> subTaskListById = subTaskRepository.getAllSubTaskById(id,name, priority, idStatus,pageable,createTime,updateTime);
            List<SubTaskRes> subTaskResListById = subTaskListById.stream().map(SubTaskMapping::mapEntityToRes).toList();
            return new ApiRes(true, "Lấy dữ liệu thành công", subTaskResListById);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }
}
