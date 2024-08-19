package com.example.back.service.interf;

import com.example.back.dto.req.StatusReq;
import com.example.back.dto.res.ApiRes;

public interface StatusService {
    ApiRes getAllStatus(String name,int page, int limit);
    ApiRes createStatus(StatusReq statusReq);
    ApiRes updateStatus(Long id, StatusReq statusReq);
    ApiRes deleteStatus(Long id);
}
