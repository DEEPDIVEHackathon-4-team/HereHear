package com.goormthon.backend.dto.res;

import java.time.LocalDateTime;

import com.goormthon.backend.entity.Comment;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentResponseDto {
	private Long id;
	private LocalDateTime createdAt;
	private Long userId;
	private String content;

	@Builder
	private CommentResponseDto(Long id, LocalDateTime createdAt, Long userId, String content) {
		this.id = id;
		this.createdAt = createdAt;
		this.userId = userId;
		this.content = content;
	}

	public static CommentResponseDto of(Comment comment) {
		return CommentResponseDto.builder()
			.id(comment.getId())
			.createdAt(comment.getCreatedAt())
			.userId(comment.getUser().getId())
			.content(comment.getContent())
			.build();
	}

}