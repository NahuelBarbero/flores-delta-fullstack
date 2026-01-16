package DeltaFlores.web.security;

import DeltaFlores.web.entities.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return ((User) authentication.getPrincipal()).getId();
        }
        // Fallback or throw exception depending on requirements. 
        // For now returning null or handling it in the caller is safer if not authenticated.
        // However, LogService expects a value.
        // Assuming the principal is the User entity as is common in Spring Security with JPA.
        // If principal is just username (String), we might need to look it up, but usually CustomUserDetailsService puts the User object there.
        
        throw new RuntimeException("No user authenticated found in SecurityContext");
    }
}
