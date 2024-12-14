package com.goormthon.backend.dto.req;

import lombok.Getter;

import com.goormthon.backend.entity.Region;

@Getter
public class LocationReq {
    private Long userId;
    private Double latitude;
    private Double longitude;
    private Region region;
}
