package com.goormthon.backend.dto.req;

import lombok.Getter;

import com.goormthon.backend.entity.Location;
import com.goormthon.backend.entity.Region;

@Getter
public class LocationReq {
    private Long userId;
    private Location location;
    private Region region;
}
