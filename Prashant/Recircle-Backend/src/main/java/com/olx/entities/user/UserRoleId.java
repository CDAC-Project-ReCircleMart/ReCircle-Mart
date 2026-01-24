package com.olx.entities.user;

import java.io.Serializable;
import java.util.Objects;

public class UserRoleId implements Serializable {

    private Long user;
    private Integer role;

    public UserRoleId() {
    }

    public UserRoleId(Long user, Integer role) {
        this.user = user;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof UserRoleId))
            return false;
        UserRoleId that = (UserRoleId) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, role);
    }
}
