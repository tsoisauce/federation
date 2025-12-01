package com.federation.products.worker.listener;

import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OrderEventListener {

  @EventListener
  public void handleOrderEvent(Object event) {
    log.info("Order event received: {}", event);
  }
}
