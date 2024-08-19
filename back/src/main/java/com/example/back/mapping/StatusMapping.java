package com.example.back.mapping;

import com.example.back.dto.req.StatusReq;
import com.example.back.dto.res.StatusRes;
import com.example.back.entity.Status;

public class StatusMapping {
    public static Status mapReqToEntity(StatusReq statusReq){
        Status status = new Status();
        status.setName(statusReq.getName());
        status.setIsDefault(false);
        status.setDescription(statusReq.getDescription());
        return status;
    }
    public static StatusRes mapEntityToRes(Status status){
        StatusRes statusRes = new StatusRes();
        statusRes.setId(status.getId());
        statusRes.setName(status.getName());
        statusRes.setIsDefault(status.getIsDefault());
        statusRes.setDescription(status.getDescription());
        return statusRes;
    }
}
