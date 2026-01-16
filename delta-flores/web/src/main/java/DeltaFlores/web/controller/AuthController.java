package DeltaFlores.web.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthController {

    /**
     * Logout endpoint: Invalida la cookie JWT en el servidor
     * Backend-First: La sesión se invalida aquí, frontend solo notifica
     */
    @PostMapping("/logout")
    @PreAuthorize("hasRole('GROWER') or hasRole('ADMIN')")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        log.info("\n\n🚪 Solicitud de logout recibida\n");

        // Invalidar cookie JWT
        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setMaxAge(0); // Expira inmediatamente
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true); // HTTPS only
        jwtCookie.setPath("/");
        jwtCookie.setAttribute("SameSite", "Strict"); // CSRF Protection
        response.addCookie(jwtCookie);

        log.info("\n\n✅ Logout exitoso: Cookie JWT invalidada\n");

        return ResponseEntity.ok().build();
    }
}
