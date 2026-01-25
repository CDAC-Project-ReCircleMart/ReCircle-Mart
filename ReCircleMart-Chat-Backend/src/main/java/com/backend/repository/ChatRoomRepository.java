package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.ChatRoom;
import com.backend.enums.ResourceType;

public interface ChatRoomRepository extends JpaRepository<ChatRoom , Long> {
	Optional<ChatRoom> findByResourceTypeAndResourceId(
			ResourceType resourceType,
			Long resourceId
			);
}
