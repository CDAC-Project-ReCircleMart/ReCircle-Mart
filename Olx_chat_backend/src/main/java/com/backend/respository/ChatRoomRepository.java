package com.backend.respository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	Optional<ChatRoom> findByResourceTypeAndResourceId(String resourceType, Long resourceId);
	
	
	boolean existsByResourceTypeAndResourceId(String resourceType, Long resourceId);
	
}
