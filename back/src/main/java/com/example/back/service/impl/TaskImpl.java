package com.example.back.service.impl;

import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.ApiResPage;
import com.example.back.dto.res.SubTaskRes;
import com.example.back.dto.res.TaskRes;
import com.example.back.entity.Status;
import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import com.example.back.mapping.SubTaskMapping;
import com.example.back.mapping.TaskMapping;
import com.example.back.repository.StatusRepository;
import com.example.back.repository.TaskRepository;
import com.example.back.service.interf.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class TaskImpl implements TaskService {
    public final TaskRepository taskRepository;
    public final StatusRepository statusRepository;

    @Override
    public ApiResPage getAllTask(String name, String priority, Long idStatus, int page, Integer limit, LocalDate createTime, LocalDate updateTime,String nameSort,String directionSort) {
        try {
            Sort.Direction direction = Sort.Direction.fromString(directionSort);
                Pageable pageable = PageRequest.of(page -1, limit, Sort.by(direction,nameSort));
            Page<Task> taskPage = taskRepository.getAllTask(name, priority, idStatus,pageable,createTime,updateTime);


            List<TaskRes> taskResList = taskPage.getContent().stream().map(TaskMapping::mapEntityToRes).toList();
            return new ApiResPage(true, "Lấy dữ liệu thành công",taskPage.getTotalElements(), taskResList);
        } catch (Exception e) {
            return new ApiResPage(false, e.getMessage(),0, null);
        }
    }

    @Override
    public ApiRes createTask(TaskReq taskReq) {
        try {
            if(!taskRepository.findByNameAndIdNot(taskReq.getName(),0L).isEmpty()){
                return new ApiRes(false,"Tên task đã tồn tại",null);
            }
            Task taskCreate = TaskMapping.mapReqToEntity(taskReq);
            Optional<Status> status = statusRepository.findById(taskReq.getIdStatus());
            taskCreate.setCreatedAt(LocalDateTime.now());
            taskCreate.setStatus(status.get());
            if(status.get().getName().equals("done")){
                taskCreate.setProgress(100F);
            }else {
                taskCreate.setProgress(0F);
            }

            taskRepository.save(taskCreate);
            TaskRes taskRes = TaskMapping.mapEntityToRes(taskCreate);
            List<TaskRes> taskResList = new ArrayList<>();
            taskResList.add(taskRes);
            return new ApiRes(true, "Thêm dữ liệu thành công", taskResList);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes updateTask(Long id, TaskReq taskReq) {
        try {
            Optional<Task> taskById = taskRepository.findById(id);
            if (taskById.isPresent()) {
                if(!taskRepository.findByNameAndIdNot(taskReq.getName(),id).isEmpty()){
                    return new ApiRes(false,"Tên task đã tồn tại",null);
                }
                Task taskUpdate = TaskMapping.mapReqToEntity(taskReq);
                Optional<Status> status = statusRepository.findById(taskReq.getIdStatus());
                Optional<Status> statusDone = statusRepository.findById(2L);
                Optional<Status> statusOpen = statusRepository.findById(1L);
                if(taskById.get().getStatus().getName().equals("done") && !status.get().getName().equals("done")){
                    taskUpdate.setProgress(0F);
                    if(!taskById.get().getSubtasks().isEmpty()) {
                        for (SubTask subTask : taskById.get().getSubtasks()) {
                            subTask.setStatus(statusOpen.get());
                            subTask.setProgress(0F);
                        }
                    }
                }
                taskUpdate.setId(id);
                taskUpdate.setStatus(status.get());
                if(status.get().getName().equals("done")){
                    taskUpdate.setProgress(100F);
                    if(!taskById.get().getSubtasks().isEmpty()) {
                        for (SubTask subTask : taskById.get().getSubtasks()) {
                            subTask.setStatus(statusDone.get());
                            subTask.setProgress(100F);
                        }
                    }
                } else {
                    if(!taskById.get().getSubtasks().isEmpty()){
                        List<SubTask> slSubTaskDone = taskById.get().getSubtasks().stream().filter(el ->el.getStatus().getName().equals("done")).toList();
                        Float tongSoLuongSubTask = Float.valueOf(taskById.get().getSubtasks().size());
                        Float progress = (slSubTaskDone.size() / tongSoLuongSubTask) * 100;
                        taskUpdate.setProgress(progress);
                    }else{
                        taskUpdate.setProgress(0F);
                    }
                }
                taskRepository.save(taskUpdate);
                return new ApiRes(true, "Cập nhật dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes deleteTask(Long id) {
        try {
            Optional<Task> taskById = taskRepository.findById(id);
            if (taskById.isPresent()) {
                taskRepository.deleteById(id);
                return new ApiRes(true, "Xoá dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes getTaskById(Long id) {
        try {
            Optional<Task>  taskbyId = taskRepository.findById(id);
            if(taskbyId.isPresent()){
                TaskRes taskRes = TaskMapping.mapEntityToRes(taskbyId.get());
                List<TaskRes>taskResList = new ArrayList<>();
                taskResList.add(taskRes);
                return new ApiRes(true,"Đã tìm thấy dữ liệu",taskResList);
            }else {
                return new ApiRes(true,"Dữ liệu không tồn tại",null);
            }
        }catch (Exception e){
            return new ApiRes(false,e.getMessage(),null);
        }
    }
}
