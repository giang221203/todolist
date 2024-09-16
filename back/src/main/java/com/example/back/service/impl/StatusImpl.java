package com.example.back.service.impl;

import com.example.back.dto.req.StatusReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.StatusRes;
import com.example.back.entity.Status;
import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import com.example.back.mapping.StatusMapping;
import com.example.back.repository.StatusRepository;
import com.example.back.repository.SubTaskRepository;
import com.example.back.repository.TaskRepository;
import com.example.back.service.interf.StatusService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class StatusImpl implements StatusService {
    private final StatusRepository statusRepository;
    private final TaskRepository taskRepository;
    private final SubTaskRepository subTaskRepository;

    @Override
    public ApiRes getAllStatus(String name,int page,Integer limit) {
        try {
            List<Status> statusList;
            if (limit == null) {
                statusList = statusRepository.getAllStatus(name);
            } else {
                Pageable pageable = PageRequest.of(page -1, limit);
                statusList = statusRepository.getAllStatus(name,pageable);
            }

            List<StatusRes> statusResList = statusList.stream().map(StatusMapping::mapEntityToRes).toList();
            return new ApiRes(true, "Lấy dữ liệu thành công", statusResList);

        }catch (Exception e){
            return new ApiRes(false,e.getMessage(),null);
        }
    }

    @Override
    public ApiRes createStatus(StatusReq statusReq) {
        try {
       if(!statusRepository.getAllStatusByNameAndIdNot(statusReq.getName(),0L).isEmpty()){
           return new ApiRes(false,"Tên status đã tồn tại",null);
       }else {
           Status statusCreate = StatusMapping.mapReqToEntity(statusReq);
           statusRepository.save(statusCreate);
           return new ApiRes(true, "Thêm status thành công", null);
       }


        }catch (Exception e){
            return new ApiRes(false,e.getMessage(),null);
        }
    }

    @Override
    public ApiRes updateStatus(Long id, StatusReq statusReq) {
        try {
            Optional<Status> statusbyId = statusRepository.findById(id);
            if(statusbyId.isPresent()){
                if(!statusRepository.getAllStatusByNameAndIdNot(statusReq.getName(),id).isEmpty()){
                    return new ApiRes(false,"Tên status đã tồn tại",null);
                }
                if(statusbyId.get().getName().equals("open") || statusbyId.get().getName().equals("done")){
                    return new ApiRes(false, "Đây là trạng thái mặc định không được chỉnh sửa", null);
                }
                Status status = StatusMapping.mapReqToEntity(statusReq);
                status.setId(id);
                statusRepository.save(status);
                return new ApiRes(true, "Cập nhật status thành công", null);
            }else {
                return new ApiRes(false, "Status không tồn tại", null);
            }

        }catch (Exception e){
            return new ApiRes(false,e.getMessage(),null);
        }
    }

    @Override
    public ApiRes deleteStatus(Long id) {
        try {

            Optional<Status> statusbyId = statusRepository.findById(id);
            if(statusbyId.isPresent()){
                if(statusbyId.get().getName().equals("open") || statusbyId.get().getName().equals("done")){
                    return new ApiRes(false, "Đây là trạng thái mặc định không được xoá", null);
                }
                List<Task> taskList = statusbyId.get().getTask();
                List<SubTask> subTaskList = statusbyId.get().getSubTasks();
                Optional<Status> status = statusRepository.findById(1L);
                if(!taskList.isEmpty()){
                    for (Task task : taskList){
                        task.setStatus(status.get());
                        taskRepository.save(task);
                    }
                }
                if(!subTaskList.isEmpty()){
                    for (SubTask subTask : subTaskList){
                        subTask.setStatus(status.get());
                        subTaskRepository.save(subTask);
                    }
                }
                statusRepository.deleteById(id);
                return new ApiRes(true, "Xoá status thành công", null);

            }else {
                return new ApiRes(false, "Status không tồn tại", null);
            }

        }catch (Exception e){
            return new ApiRes(false,e.getMessage(),null);
        }
    }
}
