package com.backend.dtos;



import java.util.List;


import com.backend.enums.ResourceType;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChatRoomRequestDTO {


private ResourceType resourceType;
private Long resourceId;
private List<Long> participantIds;
}
