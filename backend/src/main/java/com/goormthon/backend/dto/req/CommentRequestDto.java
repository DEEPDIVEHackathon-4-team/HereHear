package com.goormthon.backend.dto.req;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentRequestDto {
	private Long posterId;
	private Long userId;
	private String content;

	@Builder
	private CommentRequestDto(Long posterId, Long userId, String content) {
		this.posterId = posterId;
		this.userId = userId;
		this.content = content;
	}


}
