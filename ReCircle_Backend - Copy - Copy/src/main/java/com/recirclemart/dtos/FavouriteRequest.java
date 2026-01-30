// dto/FavouriteRequest.java
package com.recirclemart.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FavouriteRequest {
    @NotNull
    private Integer listingId;
}
