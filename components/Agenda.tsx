"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core"; // Import EventInput from @fullcalendar/core
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { redirect } from "next/navigation";

interface EventData {
  status: string;
  nextStep: string;
  nextDate: string;
  serviceComments: string;
  responsibleService: string;
  priority: string;
}

const Agenda: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]); // Store events to display

  let user_id: string | undefined;

  if (!document.cookie) {
    // Redirect to login page if user is not logged in
    redirect("/login");
  } else {
    user_id = document.cookie.split(",")[1].split("=")[1];
  }

  useEffect(() => {
    // Example event data (you can replace this with an API call)
    const data: EventData[] = [
      {
        status: "En vérification",
        nextStep: "enquete",
        nextDate: "2024-11-23",
        serviceComments: "merci",
        responsibleService: "Oreki",
        priority: "haute",
      },
      {
        status: "En attente de documents",
        nextStep: "appel_a_temoin",
        nextDate: "2024-11-24",
        serviceComments: "fool",
        responsibleService: "Oreki",
        priority: "haute",
      },
      {
        status: "En cours de traitement",
        nextStep: "interview",
        nextDate: "2024-11-26",
        serviceComments: "en avance",
        responsibleService: "Oreki",
        priority: "haute",
      },
    ];

    // Transform the data to be compatible with FullCalendar
    const formattedEvents: EventInput[] = data.map((event) => ({
      title: `${event.status} - ${event.nextStep}`, // Add nextStep to the event
      start: event.nextDate, // Ensure date format is correct
      end: event.nextDate, // Use the same end date for simplicity
      extendedProps: {
        nextStep: event.nextStep,
        nextDate: event.nextDate,
        serviceComments: event.serviceComments,
        responsibleService: event.responsibleService,
        priority: event.priority,
      },
      id: event.nextStep, // Unique identifier based on nextStep
    }));

    // Update the state with events
    setEvents(formattedEvents);
  }, []); // Empty array means this effect runs once on mount

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-900 to-primary-dark text-white">
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold text-center mb-10 text-white drop-shadow-lg">
          Agenda Futuriste
        </h1>
        <div className="rounded-lg shadow-lg bg-white/10 p-5 w-full">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="fr"
            editable={false}
            eventContent={(eventInfo) => (
              <div className="bg-primary-light text-white px-2 py-1 rounded shadow-md text-sm truncate hover:scale-105 transform transition-all">
                {eventInfo.event.title}
              </div>
            )}
            eventMouseEnter={(mouseEnterInfo) => {
              // Create a tooltip containing the title, date, and additional info
              const tooltip = document.createElement("div");
              tooltip.className =
                "absolute bg-gray-800 text-white p-2 rounded shadow-lg text-sm z-50";
              tooltip.innerHTML = `
                                <strong>${
                                  mouseEnterInfo.event.title
                                }</strong><br />
                                ${mouseEnterInfo.event.start?.toLocaleDateString(
                                  "fr-FR"
                                )} ${mouseEnterInfo.event.start?.toLocaleTimeString(
                "fr-FR"
              )}
                                <br/><strong>Étape suivante:</strong> ${
                                  mouseEnterInfo.event.extendedProps?.nextStep
                                }
                                <br/><strong>Commentaires:</strong> ${
                                  mouseEnterInfo.event.extendedProps
                                    ?.serviceComments
                                }
                            `;
              tooltip.style.position = "absolute";
              tooltip.style.zIndex = "9999";
              tooltip.style.pointerEvents = "none"; // Prevent mouse interaction with the tooltip
              document.body.appendChild(tooltip);

              // Position the tooltip relative to the mouse
              const updateTooltipPosition = (x: number, y: number) => {
                tooltip.style.left = `${x + 10}px`;
                tooltip.style.top = `${y + 10}px`;
              };

              // Initial position
              updateTooltipPosition(
                mouseEnterInfo.jsEvent.pageX,
                mouseEnterInfo.jsEvent.pageY
              );

              // Update position if the mouse moves over the event
              if (mouseEnterInfo.jsEvent.target) {
                (mouseEnterInfo.jsEvent.target as HTMLElement).addEventListener(
                  "mousemove",
                  (e: MouseEvent) => {
                    updateTooltipPosition(e.pageX, e.pageY);
                  }
                );
              }

              // Identify the tooltip for later removal
              tooltip.setAttribute(
                "data-tooltip-id",
                mouseEnterInfo.event.id as string
              );
              return null;
            }}
            eventMouseLeave={(mouseLeaveInfo) => {
              // Remove the tooltip when the mouse leaves the event
              const tooltip = document.querySelector(
                `[data-tooltip-id="${mouseLeaveInfo.event.id}"]`
              );
              if (tooltip) tooltip.remove();
              return null;
            }}
            moreLinkClick="popover" // Use a popover for the "See more" button
            eventDidMount={(info) => {
              const date = info.event.start?.toLocaleDateString("fr-FR");
              const eventTitleEl = info.el.querySelector(".fc-event-title");
              if (eventTitleEl) {
                eventTitleEl.innerHTML += ` <span class="text-gray-400 text-xs">(${date})</span>`;
              }
            }}
            dayMaxEventRows={3} // Limit the number of events displayed per day
            moreLinkText="Voir plus" // Text for additional events
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            buttonText={{
              today: "Aujourd'hui",
              month: "Mois",
              week: "Semaine",
              day: "Jour",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Agenda;
